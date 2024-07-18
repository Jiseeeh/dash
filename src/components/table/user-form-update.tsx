"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Role, UserDocument } from "@/models/User";
import { updateFormSchema } from "@/constants";
import { updateUser } from "@/actions/updateUser";

interface UserFormUpdateProps {
  user?: UserDocument;
}

const UserFormUpdate: React.FC<UserFormUpdateProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      role: user?.role,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateFormSchema>) => {
    setIsLoading(true);
    const res = await updateUser({
      ...values,
      originalEmail: user?.email,
    });

    setIsLoading(false);

    if (res) {
      toast({
        title: "User update",
        description: "The user was successfully updated 🚀",
      });

      return;
    }

    toast({
      title: "Error",
      variant: "destructive",
      description: `Something went wrong! ${res}😢`,
    });
  };

  return (
    <Form {...updateForm}>
      <form onSubmit={updateForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={updateForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="jiseeeh" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateForm.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Role.User}>User</SelectItem>
                  <SelectItem value={Role.Admin}>Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { UserFormUpdate };
