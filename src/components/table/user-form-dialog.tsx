"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserFormUpdate } from "./user-form-update";
import { UserFormRegister } from "./user-form-register";
import { Button } from "@/components/ui/button";
import { UserDocument } from "@/models/User";

interface UserFormDialogProps {
  user?: UserDocument;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({ user }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {user ? (
          <Button
            className="ml-auto w-full justify-start p-2 font-normal"
            variant="ghost"
          >
            Edit user
          </Button>
        ) : (
          <Button className="ml-auto">Create User</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {user ? "Update an existing user" : "Create a new user"}
          </DialogTitle>
          <DialogDescription>Fill out the form below.</DialogDescription>
        </DialogHeader>
        {user ? <UserFormUpdate user={user} /> : <UserFormRegister />}
      </DialogContent>
    </Dialog>
  );
};

export { UserFormDialog };
