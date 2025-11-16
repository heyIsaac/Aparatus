import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Card } from "./ui/card";

type BookingShape = {
  service: {
    id?: string;
    barbershopId?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    priceInCents?: number | null;
  };
  barbershop: {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    address?: string | null;
    phones?: string[] | null;
  };
  date: Date;
};

type BookingItemProps =
  | { booking: BookingShape }
  | {
      serviceName: string;
      barbershopName: string;
      barbershopImageUrl: string;
      date: Date;
    };

const BookingItem = (props: BookingItemProps) => {
  const { service, barbershop, date } =
    "booking" in props
      ? props.booking
      : ({
          service: { name: props.serviceName },
          barbershop: {
            name: props.barbershopName,
            imageUrl: props.barbershopImageUrl,
          },
          date: props.date,
        } as BookingShape);
  return (
    <Card className="flex h-full w-full min-w-full flex-row items-center justify-between p-0">
      {/* ESQUERDA */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge>Confirmado</Badge>

        <div className="flex flex-col gap-2">
          <p className="font-bold">{service.name}</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershop.imageUrl ?? undefined} />
            </Avatar>
            <p className="text-muted-foreground text-sm">{barbershop.name}</p>
          </div>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex h-full flex-col items-center justify-center border-l p-4 py-3">
        <p className="text-xs capitalize">
          {date.toLocaleDateString("pt-BR", { month: "long" })}
        </p>
        <p>{date.toLocaleDateString("pt-BR", { day: "2-digit" })}</p>
        <p className="text-xs capitalize">
          {date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </Card>
  );
};

export default BookingItem;
