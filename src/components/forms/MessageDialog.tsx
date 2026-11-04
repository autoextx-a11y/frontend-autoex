import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuickMessageForm } from "./QuickMessageForm";

export function MessageDialog({
  open,
  onOpenChange,
  title,
  vehicleId,
  defaultMessage,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  vehicleId?: string | undefined;
  defaultMessage?: string | undefined;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
        </DialogHeader>
        <QuickMessageForm vehicleId={vehicleId} defaultMessage={defaultMessage} />
      </DialogContent>
    </Dialog>
  );
}
