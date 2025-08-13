import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function NotificationsSkeleton() {
  // array of 5 items
  const skeletonItems = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <Card className="card-blend-light border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="border-b border-border/20 card-blend-overlay">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Notifications
            </CardTitle>
            <Skeleton className="h-4 w-20" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {skeletonItems.map((index) => (
              <div key={index} className="flex items-start gap-4 p-4 border-b border-border/15 card-blend-overlay hover:card-blend-cosmic-soft transition-all duration-300">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="pl-6 space-y-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}