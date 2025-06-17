import * as React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import ButtonComponent from "../button/Index";

type DatePickerComponentProps = {
  label?: string;
  selectedDate?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  showClearButton?: boolean;
  buttonWidth?: string;
};

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  selectedDate,
  onDateChange,
  placeholder = "Pilih tanggal",
  required = false,
  className = "",
  disabled = false,
  buttonWidth = "w-96",
}) => {
  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
    >
      <div>
        {label && (
          <label>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              buttonWidth,
              "p-2 rounded-md font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate
              ? format(selectedDate, "dd MMMM yyyy", { locale: id })
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
            locale={id}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerComponent;
