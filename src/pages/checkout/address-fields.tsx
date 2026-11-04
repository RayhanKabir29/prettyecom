import { ChevronDown, Phone } from "lucide-react"

import { Field, InputWithIcon, inputClass } from "@/components/common"
import { countries, usStates, type CountryCode } from "@/data/regions"
import { cn } from "@/lib/utils"

import type { Address, Errors } from "./form"

function NativeSelect({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(inputClass, "appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-action-default" />
    </div>
  )
}

/**
 * Address block shared by shipping and billing. `prefix` keeps names unique
 * ("shipping.zip" / "billing.zip") and sets the right autocomplete section.
 */
function AddressFields({
  prefix,
  value,
  errors,
  onChange,
  withPhone = false,
}: {
  prefix: "shipping" | "billing"
  value: Address
  errors: Errors
  onChange: (next: Address) => void
  withPhone?: boolean
}) {
  const set = <K extends keyof Address>(key: K, v: Address[K]) => onChange({ ...value, [key]: v })
  const ac = (token: string) => `section-${prefix} ${prefix} ${token}`
  const err = (key: keyof Address) => errors[`${prefix}.${key}`]
  const isUS = value.country === "US"

  return (
    <div className="flex flex-col gap-4">
      <Field label="Country / region">
        <NativeSelect
          name={`${prefix}.country`}
          autoComplete={ac("country")}
          value={value.country}
          onChange={(e) => onChange({ ...value, country: e.target.value as CountryCode, state: "" })}
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" error={err("firstName")}>
          <input name={`${prefix}.firstName`} autoComplete={ac("given-name")} className={inputClass} value={value.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Jessica" />
        </Field>
        <Field label="Last name" error={err("lastName")}>
          <input name={`${prefix}.lastName`} autoComplete={ac("family-name")} className={inputClass} value={value.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="James" />
        </Field>
      </div>

      <Field label="Street address" error={err("address1")}>
        <input name={`${prefix}.address1`} autoComplete={ac("address-line1")} className={inputClass} value={value.address1} onChange={(e) => set("address1", e.target.value)} placeholder="120 Spring Street" />
      </Field>

      <Field label="Apartment, suite, etc." optional>
        <input name={`${prefix}.address2`} autoComplete={ac("address-line2")} className={inputClass} value={value.address2} onChange={(e) => set("address2", e.target.value)} placeholder="Apartment, suite, etc." />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="City" error={err("city")}>
          <input name={`${prefix}.city`} autoComplete={ac("address-level2")} className={inputClass} value={value.city} onChange={(e) => set("city", e.target.value)} placeholder="New York" />
        </Field>
        <Field label={isUS ? "State" : "Region"} error={err("state")}>
          {isUS ? (
            <NativeSelect name={`${prefix}.state`} autoComplete={ac("address-level1")} value={value.state} onChange={(e) => set("state", e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {usStates.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </NativeSelect>
          ) : (
            <input name={`${prefix}.state`} autoComplete={ac("address-level1")} className={inputClass} value={value.state} onChange={(e) => set("state", e.target.value)} />
          )}
        </Field>
        <Field label={isUS ? "ZIP code" : "Postal code"} error={err("zip")}>
          <input
            name={`${prefix}.zip`}
            autoComplete={ac("postal-code")}
            inputMode={isUS ? "numeric" : "text"}
            className={inputClass}
            value={value.zip}
            onChange={(e) => set("zip", e.target.value)}
            placeholder={isUS ? "10012" : ""}
          />
        </Field>
      </div>

      {withPhone && (
        <Field label="Phone number" optional>
          <InputWithIcon
            icon={<Phone aria-hidden />}
            name={`${prefix}.phone`}
            type="tel"
            autoComplete={ac("tel")}
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="For delivery updates"
          />
        </Field>
      )}
    </div>
  )
}

export { AddressFields }
