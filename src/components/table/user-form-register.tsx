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
import { register } from "@/actions/register";
import { Input } from "@/components/ui/input";
import { Role } from "@/models/User";
import { registerFormSchema } from "@/constants";

interface UserFormRegisterProps {}

const UserFormRegister: React.FC<UserFormRegisterProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    console.log({ values });

    setIsLoading(true);
    const res = await register(values);
    setIsLoading(false);

    if (res) {
      registerForm.reset();

      toast({
        title: "User created",
        description: "The user was successfully created 🚀",
      });
      return;
    }

    toast({
      title: "Error",
      variant: "destructive",
      description: "Something went wrong! 😢",
    });
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
          control={registerForm.control}
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
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { UserFormRegister };
