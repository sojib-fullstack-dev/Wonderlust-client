'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { IDestination } from "../type/apiType";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTokenClient } from "@/lib/tokenFromClient";




const DeletDestination = ({ destination }: { destination: IDestination }) => {
    //    console.log(destination)
    const router = useRouter()
const handleSubmit = async () => {


  const token=await getTokenClient();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destination._id}`,
      {
        method: "DELETE",
        headers:{
          authorization:` Bearer ${token}`
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete destination");
    }

    toast.success("Destination deleted successfully!");
    
    // এখানে পরিবর্তন করো
    router.push("/destinations");   // ← list page-এ যাও
    router.refresh();

  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
};
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline"><Trash2 aria-hidden="true" className="size-3.5" />

                Cancel</Button>} />
            <AlertDialogContent className="w-[calc(100%-2rem)] max-w-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col-reverse sm:flex-row">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeletDestination;