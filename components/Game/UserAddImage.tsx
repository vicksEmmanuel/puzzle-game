import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";
import DrawerComponent from "./DrawerComponent";
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

const UserAddImage = ({
  onClose,
  isOpen,
  onChange,
}: {
  isOpen: boolean;
  onClose(): void;
  onChange(image: string, level: number): void;
}) => {
  const { t } = useTranslation();
  const allLevels = [
    { label: "Level 1", value: 3 },
    { label: "Level 2", value: 10 },
  ];
  const [level, setLevel] = useState(0);
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];
  const [file, setFile] = useState(null);

  const onChangeValue = () => {
    if (file) {
      Object.keys(file ?? []).map((_, idx) => {
        var reader = new FileReader();
        reader.onloadend = (e) => {
          const imageData = {
            uri: URL.createObjectURL(file[idx]),
            file: file[idx],
            base64: e?.target?.result as string,
          };

          onChange(imageData.uri, allLevels[level].value);
        };

        reader.readAsDataURL(file[idx] as any);
      });
    }
  };

  const handleChange = (filex: any) => {
    setFile(filex);
  };

  return (
    <DrawerComponent header={<></>} isOpen={isOpen} onClose={onClose}>
      <div>
        <div>{t("Select an Image")}</div>
        <div className="mt-5">
          <div className="flex flex-row">
            <div className="flex-row">
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
            </div>
          </div>

          <div className="mt-5">
            <Select
              placeholder="Choose a level"
              width={400}
              height={50}
              onChange={(e) => {
                setLevel(e.target.value as any);
              }}
              value={level}
            >
              {allLevels.map((i, idx) => (
                <option key={i.label} value={idx}>
                  {i.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              disabled={!file}
              onClick={() => {
                onChangeValue();
              }}
              className="py-3
            bg-primary w-full hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg disabled:cursor-not-allowed disabled:bg-slate-500 flex flex-row items-center justify-center"
            >
              <div className="mr-4">{t("Play")}</div>
            </button>
          </div>
        </div>
      </div>
    </DrawerComponent>
  );
};

export default UserAddImage;
