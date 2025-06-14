
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Supply {
  id: string;
  user_id: string;
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unit: string;
  cost_per_unit?: number;
  supplier?: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  low_stock_threshold?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSupplyData {
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unit: string;
  cost_per_unit?: number;
  supplier?: string;
  low_stock_threshold?: number;
}

export const useSupplies = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: supplies = [], isLoading, error } = useQuery({
    queryKey: ['supplies', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('supplies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching supplies:', error);
        throw error;
      }

      return data as Supply[];
    },
    enabled: !!user?.id,
  });

  const createSupplyMutation = useMutation({
    mutationFn: async (supplyData: CreateSupplyData) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('supplies')
        .insert({
          ...supplyData,
          user_id: user.id,
          cost_per_unit: supplyData.cost_per_unit ? Number(supplyData.cost_per_unit) : null,
          quantity: Number(supplyData.quantity),
          low_stock_threshold: supplyData.low_stock_threshold ? Number(supplyData.low_stock_threshold) : 0,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating supply:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast({
        title: "Success",
        description: "Supply item added successfully",
      });
    },
    onError: (error) => {
      console.error('Create supply error:', error);
      toast({
        title: "Error",
        description: "Failed to add supply item",
        variant: "destructive",
      });
    },
  });

  const updateSupplyMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Supply> & { id: string }) => {
      const { data, error } = await supabase
        .from('supplies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating supply:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast({
        title: "Success",
        description: "Supply item updated successfully",
      });
    },
    onError: (error) => {
      console.error('Update supply error:', error);
      toast({
        title: "Error",
        description: "Failed to update supply item",
        variant: "destructive",
      });
    },
  });

  const deleteSupplyMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('supplies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting supply:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplies'] });
      toast({
        title: "Success",
        description: "Supply item deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Delete supply error:', error);
      toast({
        title: "Error",
        description: "Failed to delete supply item",
        variant: "destructive",
      });
    },
  });

  return {
    supplies,
    isLoading,
    error,
    createSupply: createSupplyMutation.mutate,
    updateSupply: updateSupplyMutation.mutate,
    deleteSupply: deleteSupplyMutation.mutate,
    isCreating: createSupplyMutation.isPending,
    isUpdating: updateSupplyMutation.isPending,
    isDeleting: deleteSupplyMutation.isPending,
  };
};
