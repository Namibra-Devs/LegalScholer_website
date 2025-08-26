import { Card, CardContent } from "@components/ui/card";
import React from "react";
const plans = [
  { title: "Starter", price: "$29/mo", features: ["AI Research", "Case Summaries"] },
  { title: "Professional", price: "$79/mo", features: ["Everything in Starter", "Court Precedents", "Priority Support"] },
  { title: "Enterprise", price: "Custom", features: ["Custom AI Models", "Dedicated Support"] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <h1 className="text-4xl font-bold text-center my-10 text-primary">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
        {plans.map((plan, i) => (
          <Card key={i} className="shadow-xl">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl font-semibold">{plan.title}</h2>
              <p className="text-3xl font-bold mt-4">{plan.price}</p>
              <ul className="mt-4 text-gray-600 space-y-2">
                {plan.features.map((f, i) => <li key={i}>✔ {f}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
