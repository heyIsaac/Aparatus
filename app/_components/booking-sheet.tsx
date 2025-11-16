"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { BarbershopServices, Barbershop } from "../generated/prisma/client";
import { Sheet, SheetContent, SheetClose } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface BookingSheetProps {
  service: BarbershopServices;
  barbershop: Barbershop;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingSheet = ({
  service,
  barbershop,
  open,
  onOpenChange,
}: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  // Limpar estados ao fechar o Sheet
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    }
  }, [open]);

  // Gerar horários de 09:00 às 18:00 de meia em meia hora
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 18; hour++) {
      if (hour === 18) {
        slots.push("18:00");
      } else {
        slots.push(`${hour.toString().padStart(2, "0")}:00`);
        slots.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Formatar data para "DD de Mês"
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });
  };

  // Formatar preço em reais
  const formatPrice = (priceInCents: number): string => {
    return (priceInCents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleConfirm = () => {
    // Aqui pode ser implementada a lógica de confirmação
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <div className="flex flex-col gap-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-lg font-bold">Fazer Reserva</h2>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>

          {/* Calendar */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
            />
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="flex flex-col gap-3">
              <h3 className="text-foreground text-sm font-semibold">
                Selecione o horário
              </h3>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Summary Card */}
          {selectedTime && selectedDate && (
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Service Name and Price */}
                  <div className="flex items-center justify-between">
                    <p className="text-card-foreground text-base font-bold">
                      {service.name}
                    </p>
                    <p className="text-card-foreground text-base font-bold">
                      {formatPrice(service.priceInCents)}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Data
                      </span>
                      <span className="text-foreground text-sm">
                        {formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Horário
                      </span>
                      <span className="text-foreground text-sm">
                        {selectedTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Barbearia
                      </span>
                      <span className="text-foreground text-sm">
                        {barbershop.name}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirmar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
