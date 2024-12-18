import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { ReactNode } from "react";

interface CardLayoutProps {
  src?: string | "";
  alt?: string | "";
  children: ReactNode;
}

const CardLayout = ({ children, alt, src }: CardLayoutProps) => {
  return (
    <Card className="pb-4 h-[420px] sm:h-[440px]">
      <CardHeader className="overflow-visible py-2">
        <Image
          removeWrapper
          alt="Card background"
          className="object-cover rounded-xl w-full"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardHeader>
      <CardBody className="pb-0 pt-2 px-4 flex-col items-start relative overflow-x-hidden">
        {children}
      </CardBody>
      <CardFooter className="absolute bottom-0 w-full flex justify-end">
        <Button>Read more</Button>
      </CardFooter> 
    </Card>
  );
};

export default CardLayout;
