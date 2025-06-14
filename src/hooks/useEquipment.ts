
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Equipment {
  id: string;
  user_id: string;
  name: string;
  category: string;
  description?: string;
  purchase_date?: string;
  purchase_cost?: number;
  status: 'operational' | 'maintenance' | 'repair' | 'retired';
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEquipmentData {
  name: string;
  category: string;
  description?: string;
  purchase_date?: string;
  purchase_cost?: number;
  status?: 'operational' | 'maintenance' | 'repair' | 'retired';
  last_maintenance_date?: string;
  next_maintenance_date?: string;
}

export const useEquipment = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: equipment = [], isLoading, error } = useQuery({
    queryKey: ['equipment', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }

      return data as Equipment[];
    },
    enabled: !!user?.id,
  });

  const createEquipmentMutation = useMutation({
    mutationFn: async (equipmentData: CreateEquipmentData) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('equipment')
        .insert({
          ...equipmentData,
          user_id: user.id,
          purchase_cost: equipmentData.purchase_cost ? Number(equipmentData.purchase_cost) : null,
          status: equipmentData.status || 'operational',
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating equipment:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success("🔧 Equipment Added Successfully!", {
        description: `${data.name} has been added to your equipment inventory`,
        duration: 4000,
      });
    },
    onError: (error) => {
      console.error('Create equipment error:', error);
      toast.error("❌ Failed to Add Equipment", {
        description: "There was an error adding the equipment. Please try again.",
        duration: 4000,
      });
    },
  });

  const updateEquipmentMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Equipment> & { id: string }) => {
      const { data, error } = await supabase
        .from('equipment')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating equipment:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success("✅ Equipment Updated!", {
        description: `${data.name} has been updated successfully`,
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error('Update equipment error:', error);
      toast.error("❌ Update Failed", {
        description: "Failed to update equipment. Please try again.",
        duration: 4000,
      });
    },
  });

  const deleteEquipmentMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting equipment:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success("🗑️ Equipment Removed", {
        description: "Equipment has been deleted from your inventory",
        duration: 3000,
      });
    },
    onError: (error) => {
      console.error('Delete equipment error:', error);
      toast.error("❌ Delete Failed", {
        description: "Failed to delete equipment. Please try again.",
        duration: 4000,
      });
    },
  });

  return {
    equipment,
    isLoading,
    error,
    createEquipment: createEquipmentMutation.mutate,
    updateEquipment: updateEquipmentMutation.mutate,
    deleteEquipment: deleteEquipmentMutation.mutate,
    isCreating: createEquipmentMutation.isPending,
    isUpdating: updateEquipmentMutation.isPending,
    isDeleting: deleteEquipmentMutation.isPending,
  };
};
