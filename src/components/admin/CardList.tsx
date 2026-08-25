import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { popularProducts, latestTransactions } from "../../data/adminData";

interface CardListProps {
  title: string;
}

export function CardList({ title }: CardListProps) {
  const isPopularProducts = title === "Popular Products";

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPopularProducts
          ? popularProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                    <img
                      src={product.images.black}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">${product.price}</Badge>
              </div>
            ))
          : latestTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                    <img
                      src={txn.image}
                      alt={txn.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {txn.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {txn.badge}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">${txn.count}</Badge>
              </div>
            ))}
      </CardContent>
    </Card>
  );
}
