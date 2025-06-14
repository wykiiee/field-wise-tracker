
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Supply {
  id: string;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unit: string;
  cost_per_unit?: number;
  supplier?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  low_stock_threshold?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export type CreateSupplyData = Omit<Supply, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'status'>;

export const useSupplies = () => {
  const queryClient = useQueryClient();

  const { data: supplies, isLoading, error, refetch } = useQuery({
    queryKey: ['supplies'],
    queryFn: async () => {
      console.log('Fetching supplies...');
      const { data, error } = await supabase
        .from('supplies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching supplies:', error);
        throw error;
      }

      console.log('Supplies fetched:', data);
      return data as Supply[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (supply: CreateSupplyData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('supplies')
        .insert({ ...supply, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
    },
  });

  const addSupply = async (supply: Omit<Supply, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('supplies')
      .insert([{ ...supply, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    refetch();
    return data;
  };

  const updateSupply = async (id: string, updates: Partial<Supply>) => {
    const { data, error } = await supabase
      .from('supplies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    refetch();
    return data;
  };

  const deleteSupply = async (id: string) => {
    const { error } = await supabase
      .from('supplies')
      .delete()
      .eq('id', id);

    if (error) throw error;
    refetch();
  };

  return {
    supplies,
    isLoading,
    error,
    addSupply,
    updateSupply,
    deleteSupply,
    refetch,
    createSupply: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
