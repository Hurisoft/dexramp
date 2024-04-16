import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";

function AddPaymentMethodButton() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="secondary" className="mt-4">
                    <PlusIcon/> Add Payment Method
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogBody className="flex flex-col gap-6 pt-6">
                        <div className="flex flex-col gap-4">
                            <Label>Bank</Label>
                            <Select
                            >
                                <SelectTrigger id="bank">
                                    <SelectValue placeholder="Bank"/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="GTBank">GT Bank</SelectItem>
                                    <SelectItem value="Stanchart">Standard Chartered</SelectItem>
                                    <SelectItem value="Ecobank">Ecobank</SelectItem>
                                    <SelectItem value="MTN">MTN MoMo</SelectItem>
                                    <SelectItem value="Telecel">Telecel Cash</SelectItem>
                                    <SelectItem value="AT">AT Money</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>Account Number</Label>
                            <Input type="number" placeholder="0234134343342"/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>Account Name</Label>
                            <Input type="text" placeholder="John Doe"/>
                        </div>
                    </DialogBody>
                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="secondary" className="w-full">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button className="w-full">Add</Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default AddPaymentMethodButton;