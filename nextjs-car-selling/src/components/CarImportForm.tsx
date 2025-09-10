// Client formulář v RHF + shadcn; sanitizace čísel, honeypot, toasty přes Sonner, POST na /api/order-car.
// https://react-hook-form.com/docs/usecontroller
// https://ui.shadcn.com/docs/components/form
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  CarOrderSchema,
  currentYear,
  type CarOrderInput as FormValues, 
} from "@/lib/carOrderSchema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CarImportForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(CarOrderSchema),
    defaultValues: {
      jmeno: "",
      prijmeni: "",
      telefon: "",
      email: "",
      znacka: "",
      model: "",
      najezdOd: 0,
      najezdDo: 200000,
      rokOd: 2012,
      rokDo: currentYear,
      preference: "",
      hp: "", // honeypot
    },
    mode: "onBlur",
  });

  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/order-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        let msg = "Odeslání selhalo.";
        try {
          const data = await res.json();
          msg = data?.message || msg;
        } catch {}
        throw new Error(msg);
      }

      toast.success("Formulář byl úspěšně odeslán 🎉", {
        description: "Ozveme se co nejdříve.",
      });
      form.reset();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Zkus to prosím znovu.";
      toast.error("Chyba při odesílání ❌", { description: message });
    } finally {
      setSubmitting(false);
    }
  };

  const preventWheelChange = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-1 text-2xl font-semibold">Objednávka dovozu auta</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Vyplň prosím údaje co nejpřesněji. Pole s hvězdičkou jsou povinná.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* 🐝 Honeypot – mimo Controller */}
          <input
            type="text"
            {...form.register("hp")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          {/* Jméno */}
          <FormField
            control={form.control}
            name="jmeno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Jan"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[0-9]/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Příjmení */}
          <FormField
            control={form.control}
            name="prijmeni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Příjmení *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Novák"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[0-9]/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Telefon */}
          <FormField
            control={form.control}
            name="telefon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tel. číslo *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    inputMode="tel"
                    placeholder="+420 777 123 456"
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[^0-9+\s-]/g, ""))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* E-mail */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="jan.novak@email.cz"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Značka */}
          <FormField
            control={form.control}
            name="znacka"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Značka *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Škoda" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Model */}
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model auta *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Octavia" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nájezd od–do */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="najezdOd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nájezd – od (km) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={800000}
                      step={1000}
                      onWheel={preventWheelChange}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? undefined : +e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="najezdDo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nájezd – do (km) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={800000}
                      step={1000}
                      onWheel={preventWheelChange}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? undefined : +e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Rok od–do */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="rokOd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rok – od *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={1990}
                      max={currentYear}
                      step={1}
                      onWheel={preventWheelChange}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? undefined : +e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rokDo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rok – do *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min={1990}
                      max={currentYear}
                      step={1}
                      onWheel={preventWheelChange}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? undefined : +e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Preference */}
          <FormField
            control={form.control}
            name="preference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Další preference klienta – barva, výbava, atd.</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Např.: bílá barva, automat, adaptivní tempomat…"
                    className="min-h-[120px] resize-y"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" disabled={submitting} className="w-full md:w-auto">
              {submitting ? "Odesílám…" : "Odeslat poptávku"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
