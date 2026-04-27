import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE = "http://localhost:3000";

// --- API FUNCTIONS ---

const createOrder = async (newOrder) => {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  if (!res.ok) throw new Error("Could not create order");
  return res.json();
};

export const deleteOrder = async (id) => {
  const response = await fetch(`${API_BASE}/api/orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }

  return await response.json();
};

// --- REACT QUERY HOOKS ---

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onMutate: async (newOrder) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previousOrders = queryClient.getQueryData(["orders"]);

      queryClient.setQueryData(["orders"], (old) => [
        ...(old || []),
        {
          ...newOrder,
          id: `temp-${Date.now()}`,
          optimistic: true,
        },
      ]);

      return { previousOrders };
    },

    onError: (_err, _newOrder, context) => {
      queryClient.setQueryData(["orders"], context?.previousOrders);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
  });
};

export const useDeleteOrderMutation = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      const previousOrders = queryClient.getQueryData(["orders"]);

      queryClient.setQueryData(["orders"], (old) =>
      (old || []).filter((order) => order.id !== id)
    );
    
    return { previousOrders };
  },

  onError: (_err, _id, context) => {
    queryClient.setQueryData(["orders"], context?.previousOrders);
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  },

  });
};
