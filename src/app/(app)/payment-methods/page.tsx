import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AddPaymentMethodButton from "@/components/custom/AddPaymentMethodButton";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

function Page() {
  return (
    <div className="md:p-6 max-w-screen-2xl mx-auto">
      <div className="mb-6"><AddPaymentMethodButton /></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>MTN MoMo</TableCell>
            <TableCell>Some Guy</TableCell>
            <TableCell>0328492032</TableCell>
            <TableCell className="flex gap-4">
              <Button variant="secondary" className="w-full">Edit</Button>
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Payment Method</DialogTitle>
                    <DialogDescription className="flex justify-between gap-2 items-center py-4">
                      Are you sure you want to delete this payment method? This action cannot
                      be undone if you proceed.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className="w-full">Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
