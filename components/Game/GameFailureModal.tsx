import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import brownBackground from '../../public/assets/game/browbackground.jpg';
import outerSpace from '../../public/assets/game/outerspace.jpg';
import HealthBar from './HealthBar';

export interface ModalProps {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  health?: number;
}

const GameFailureModal = ({ isOpen, onOpen, onClose, health }: ModalProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const actions = [
    {
      text: t('Restart'),
      onAction: () => {
        onClose();
      },
    },
    {
      text: t('Find the Stars'),
      onAction: () => {
        router.push('/');
        onClose();
      },
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
      <ModalOverlay />
      <ModalContent backgroundColor={'transparent'}>
        <ModalBody>
          <div className="relative w-full mt-24 h-[600px] items-center">
            <div className="h-full w-full bg-white rounded-lg flex flex-row  items-center px-6">
              <div className="items-center flex flex-col cursor-pointer">
                <Image
                  src={outerSpace}
                  alt={'Game Wallpaper'}
                  width={350}
                  height={300}
                  placeholder="blur"
                  className=" rounded-2xl w-[100px]"
                />

                <div className="mt-5">
                  {actions.map((i, idx) => {
                    return (
                      <div
                        key={idx}
                        className="my-2 items-center"
                        onClick={() => i.onAction()}
                      >
                        <Image
                          src={brownBackground}
                          alt={'Game Wallpaper'}
                          width={300}
                          height={60}
                          placeholder="blur"
                          className=" rounded-2xl w-[100px]"
                        />
                        <div className="relative z-50 -top-12  text-white text-center text-lg">
                          {i.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <HealthBar hp={health} />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GameFailureModal;
