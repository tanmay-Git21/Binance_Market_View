import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Destructure the necessary props, including onSelect
export function CreatedDropdown({ categoryName, items, onSelect }) {
  return (
    <Select onValueChange={onSelect}> {/* Use the onSelect prop */}
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select a ${categoryName}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
  