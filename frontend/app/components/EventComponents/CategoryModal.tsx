"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryForm } from "@/app/hooks/useCategoryForm";

interface CategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: (newCategory: any) => void;
}

export const CategoryModal = ({ open, onOpenChange, onSuccess }: CategoryModalProps) => {
    const { form, isCreatingCategory, onCategorySubmit } = useCategoryForm({
        onOpenChange,
        onSuccess
    });

    const { register, formState: { errors }, watch, handleSubmit } = form;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                        Add a custom category to organize your events.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="category-name">Name</Label>
                        <Input
                            id="category-name"
                            {...register("name")}
                            placeholder="e.g. Workshop"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="category-desc">Description</Label>
                        <Textarea
                            id="category-desc"
                            {...register("description")}
                            placeholder="Brief description of this category..."
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="category-color">Color</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="category-color"
                                type="color"
                                {...register("color")}
                                className="w-12 h-10 p-1 cursor-pointer"
                            />
                            <span className="text-sm text-slate-500">
                                {watch("color")}
                            </span>
                        </div>
                        {errors.color && (
                            <p className="text-xs text-red-500">{errors.color.message}</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit(onCategorySubmit)}
                        disabled={isCreatingCategory}
                    >
                        {isCreatingCategory ? "Creating..." : "Create Category"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
