import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";

export default function DrawerExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Text style={{ fontFamily: "MontserratSemiBold" }}>Edit Profile</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "MontserratRegular" }}>
            Edit profile
          </DialogTitle>
          <DialogDescription style={{ fontFamily: "MontserratRegular" }}>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text style={{ fontFamily: "MontserratRegular" }}>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
