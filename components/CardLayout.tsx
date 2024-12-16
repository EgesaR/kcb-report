import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { ReactNode } from "react";

interface CardLayoutProps {
  src?: string | "";
  alt?: string | "";
  children: ReactNode;
}

const CardLayout = ({children, alt, src}:CardLayoutProps) => {
  return (
    <Card className="pb-4">
      <CardHeader className="overflow-visible py-2">
      <Image
          removeWrapper
          alt="Card background"
          className="object-cover rounded-xl w-full"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardHeader>
      <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
        {children}
      </CardBody>
    </Card>
  );
}

export default CardLayout