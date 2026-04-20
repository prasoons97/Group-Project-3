export const deleteOrder = async (id) => {
    const response = await fetch (`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete order");
    }

    return await response.json();
};
