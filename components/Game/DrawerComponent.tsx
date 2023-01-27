import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

const DrawerComponent = ({
  children,
  header,
  isOpen,
  onClose,
}: {
  children: any;
  isOpen: boolean;
  onClose(): void;
  header: JSX.Element;
}) => {
  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={"sm"}
      orientation="horizontal"
    >
      <DrawerOverlay />
      <DrawerContent style={{ overflow: "scroll" }}>
        <DrawerCloseButton />
        <DrawerHeader>{header}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
