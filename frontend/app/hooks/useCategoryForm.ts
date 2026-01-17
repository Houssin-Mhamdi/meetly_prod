import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormValues } from "@/app/validations/schemas";
import { useCreateCategoryMutation } from "@/app/services/queries/categoryQuery";

interface UseCategoryFormProps {
    onOpenChange: (open: boolean) => void;
    onSuccess?: (newCategory: any) => void;
}

export const useCategoryForm = ({ onOpenChange, onSuccess }: UseCategoryFormProps) => {
    const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategoryMutation();

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            description: "",
            color: "#3b82f6",
        }
    });

    const onCategorySubmit = (data: CategoryFormValues) => {
        createCategory({
            name: data.name,
            description: data.description || "",
            color: data.color || "#3b82f6"
        }, {
            onSuccess: (newCat) => {
                onOpenChange(false);
                form.reset();
                if (onSuccess) onSuccess(newCat);
            }
        });
    };

    return {
        form,
        isCreatingCategory,
        onCategorySubmit
    };
};
