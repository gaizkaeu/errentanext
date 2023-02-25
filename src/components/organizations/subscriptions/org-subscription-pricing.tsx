import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PaymentButton } from "./org-subscription-payment-button";

const featureBackground = cva(
  "min-w-20rem rounded-xl transition-all hover:scale-105",
  {
    variants: {
      type: {
        basic:
          "bg-green-500",
        featured1:
          "bg-blue-500",
        featured2:
          "bg-red-500",
      },
    },
    defaultVariants: {
      type: "basic",
    },
  }
)


export const PricingTable = (props: {org_id: string}) => {
  const prices = [
    {
      name: "Basic",
      bg: "basic" as const,
      id: "price_1MVsoAGrlIhNYf6eOtx9sNvE",
      price: 75,
      features: [
        "3 abogados en tu asesoría",
        "Documentos ilimitados",
        "Citas ilimitadas",
        "Destacado en tu ciudad",
      ],
    },
    {
      name: "Featured Province",
      bg: "featured1" as const,
      id: "price_1MWLOjGrlIhNYf6eWviEtsUU",
      price: 110,
      features: [
        "10 abogados en tu asesoría",
        "Documentos ilimitados",
        "Citas ilimitadas",
        "Destacado en tu provincia",
      ],
    },
    {
      name: "Featured Spain",
      bg: "featured2" as const,
      price: 120,
      id: "price_1MWLPLGrlIhNYf6eiDdiG8XZ",
      features: [
        "Abogados ilimitados",
        "Documentos ilimitados",
        "Citas ilimitadas",
        "Destacado en toda España",
      ],
    },
  ];

  return (
    <div className="flex overflow-x-auto space-x-8 p-4 rounded-lg">
      <div className="rounded flex gap-4 text-white mx-auto">
        {prices.map((price) => (
          <div className={cn(featureBackground({ type: price.bg }))} key={price.name}>
            <p className="font-semibold bg-opacity-20 rounded-t px-4 py-2">
              {price.name}
            </p>

            <div className="flex flex-row items-center pt-8 bg-opacity-10 pl-12 pr-10 gap-3">
              <div className="flex flex-row gap-1">
                <p className="text-5xl font-semibold">{price.price}</p>
                <span className="text-base"> € </span>
              </div>
              <p className="font-light text-xs">
                Mensuales <br /> Por asesoria
              </p>
            </div>

            <div className="flex flex-row items-center justify-center   bg-opacity-10 pt-5 pb-10">
              <p className="text-xs text-gray-300 border border-gray-50 border-opacity-20 rounded-full py-1 px-2">
                {price.price}€ / mes
              </p>
            </div>

            <div className="grid grid-cols-12 px-4 gap-y-3 pt-10">
              <div className="col-span-11 text-sm flex items-center font-semibold pl-2">
                Declaraciones ilimitadas
              </div>

              <div className="col-span-12 h-[1px]   bg-opacity-20"></div>

              {price.features.map((feature) => (
                <>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="col-span-11 text-sm flex items-center font-light pl-2">
                    {feature}
                  </div>
                </>
              ))}
              <div className="col-span-12 mt-20 mb-5 text-gray-100">
                <PaymentButton id={price.id} org_id={props.org_id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
