import { Delete } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onFileUpload: (file: File) => void;
  file?: File;
  onFileDelete?: () => void;
  onError?: () => void;
};

const FileUpload: React.FC<Props> = ({
  onFileUpload,
  file,
  onFileDelete,
  onError,
}) => {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [isFilePresent, setIsFilePresent] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(
    file || null,
  );
  const [error, setError] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  const validateFileType = (file: File): boolean => {
    if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'text/csv'
    ) {
      return true;
    }
    return false;
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      if (validateFileType(file)) {
        setIsFilePresent(true);
        setUploadedFile(file);
        onFileUpload(file);
      } else {
        setError(true);
        setIsFilePresent(false);
        setUploadedFile(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setTimeout(() => {
          setError(false);
        }, 2000);
        onError && onError();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (validateFileType(file)) {
        setIsFilePresent(true);
        setUploadedFile(file);
        onFileUpload(file);
      } else {
        setError(true);
        setIsFilePresent(false);
        setUploadedFile(null);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setTimeout(() => {
          setError(false);
        }, 2000);
        onError && onError();
      }
    }
  };

  const handleDeleteFile = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setIsFilePresent(false);
      setUploadedFile(null);
      onFileDelete && onFileDelete();
    }, 0);
  };

  return (
    <Box
      className={`relative border-2 p-4 text-center cursor-pointer`}
      style={
        isDragActive
          ? { borderColor: 'green', borderStyle: 'dashed' }
          : { borderColor: 'gray' }
      }
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragEnter}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        ref={inputRef}
        id="fileInput"
      />
      <label className="flex flex-col items-center" htmlFor="fileInput">
        <Box
          sx={!isFilePresent ? { cursor: 'pointer' } : {}}
          className="absolute top-0 left-0 w-full h-full bg-transparent z-10"
        />
        {isFilePresent && uploadedFile ? (
          <Stack direction="row" className="items-center">
            <Typography className="text-green-800" variant="subtitle1">
              {uploadedFile.name || 'Untitled'}
            </Typography>
            <IconButton
              size="small"
              onClick={handleDeleteFile}
              color="success"
              className="z-[100]"
            >
              <Delete />
            </IconButton>
          </Stack>
        ) : (
          <>
            <Typography className="text-green-800" variant="subtitle1">
              {isDragActive ? t('dropFileHere') : t('dragNDropFileHere')}
            </Typography>
          </>
        )}
        <Typography
          className="mt-2"
          variant="subtitle2"
          color={error ? 'error' : 'inherit'}
        >
          {error ? t('wrongFileFormat') : `${t('acceptedFormats')}: CSV, Excel`}
        </Typography>
      </label>
    </Box>
  );
};

export { FileUpload };
