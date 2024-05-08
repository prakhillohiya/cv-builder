import { Box, Chip, LinearProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CVTemplate from "../CVTemplate/CVTemplate";
import {
  useCustomMutationClient,
  useCustomQueryClient,
} from "../config/queryClient";
import CV, { ICV, IMenuItems } from "../shared/components/CV";
import Confirmation from "../shared/components/Confirmation";
import { useDialog } from "../shared/context/DialogProvider";
import { updateCVTemplateState } from "../store/cvTemplate/cvTemplateSlice";
import { RootState } from "../store/store";
import { StoreContext } from "../shared/context/StoreProvider";

const menuItems: IMenuItems[] = [
  {
    id: "1",
    action: "Select",
    icon: "ep:select",
  },
  {
    id: "2",
    action: "Preview",
    icon: "icon-park-solid:preview-open",
  },
  {
    id: "3",
    action: "Delete",
    icon: "ic:outline-delete",
  },
];

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [cVTemplateId, setCVTemplateId] = useState<string | null>(null);

  const {
    refetch,
    isLoading: queryLoading,
    error: queryError,
    data: queryData,
    isSuccess: querySuccess,
  } = useCustomQueryClient<ICV[]>({
    url: "/template/fetchAll",
    method: "get",
    queryKey: "getAllCVTemplates",
    enabled: true,
  });

  const {
    mutate,
    isPending: mutatePending,
    error: mutateError,
    data: mutateData,
    isSuccess: mutateSuccess,
  } = useCustomMutationClient<ICV>({
    url: `/template/delete/${cVTemplateId}`,
    method: "delete",
    mutationKey: "deleteCVTemplate",
    successCallback: () => {
      refetch();
    },
  });

  const cvTemplate = useSelector((state: RootState) => state.cvTemplate);
  const dispatch = useDispatch();

  const { openDialog, setIsOpen } = useDialog();

  const { setError } = useContext(StoreContext);

  useEffect(() => {
    if (!queryLoading && querySuccess) {
      dispatch(updateCVTemplateState(queryData.data.data));
    }
  }, [queryLoading, querySuccess, queryData]);

  useEffect(() => {
    if (queryError && !queryLoading) {
      setError(queryError);
    }
  }, [queryError]);

  if (queryLoading || !querySuccess) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  const parentConfirmClick = async (
    e: React.MouseEvent<HTMLElement>,
    cv: ICV
  ) => {
    setCVTemplateId(cv._id);
    await mutate(cv);
    dispatch(updateCVTemplateState(queryData?.data.data));
    setIsOpen(false);
  };

  const parentMenuItemClick = (
    { id, action }: Partial<IMenuItems>,
    cv: ICV
  ) => {
    switch (action) {
      case "Select":
        navigate(`/app/editor/${cv._id}`, {
          state: {
            fetchUrl: `/template/fetch/${cv._id}`,
            postUrl: `/cv/create`,
            query: true,
          },
        });
        break;
      case "Preview":
        openDialog(
          <CVTemplate cv={cv} width="650px" showDownload={false} />,
          "Template Preview"
        );
        break;

      case "Delete":
        openDialog(
          <Confirmation
            parentConfirmClick={(e) => parentConfirmClick(e, cv)}
          />,
          "Confirmation"
        );
        break;

      default:
        break;
    }
  };

  if (queryLoading || !queryData?.data) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Chip
        label={`Total Predefined Layouts - ${cvTemplate.length}`}
        color="success"
        sx={{
          margin: "1rem",
          width: "20%",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      />
      <CV
        cv={cvTemplate}
        menuItems={menuItems}
        parentMenuItemClick={parentMenuItemClick}
      />
    </>
  );
};

export default Layout;
