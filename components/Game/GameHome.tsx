import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Trans } from 'react-i18next';
import gameWallpaper from '../../public/assets/game/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background.jpg';
import styles from '../Game/Game.module.scss';

export interface GameHomeProps {
  isOpen: boolean;
  onClose(): void;
}

const GameHome = ({ isOpen, onClose }: GameHomeProps) => {
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
      <ModalOverlay />
      <ModalContent backgroundColor={'transparent'}>
        <ModalBody>
          <div className="relative w-full h-[700px] items-center">
            <Image
              src={gameWallpaper}
              alt={'Game Wallpaper'}
              placeholder="blur"
              className=" rounded-2xl absolute"
              layout="fill"
            />
            <h3 className={`${styles.h3}`}>
              <Trans>
                <span>Play</span> &nbsp;
                <span> our</span> &nbsp;
                <span> puzzle</span> &nbsp;
                <span> game</span> &nbsp;
                <span> while</span>&nbsp;
                <span> you</span>&nbsp;
                <span> wait</span>&nbsp;
                <span> for</span>&nbsp;
                <span> our</span>&nbsp;
                <span> feedback</span>&nbsp;
              </Trans>
              <div className={styles[`scroll-more`]}>↓</div>
            </h3>

            <div className="w-full items-center flex justify-center">
              <div className={`${styles[`btn`]} cursor-pointer`}>
                <div
                  onClick={() => {
                    onClose?.();
                    router.push('/puzzle');
                  }}
                  className="outline-none border-none"
                >
                  Play Game
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GameHome;
