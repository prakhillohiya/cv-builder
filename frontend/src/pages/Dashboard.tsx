import React, { useContext, useEffect, useState } from "react";
import Badge from "../shared/components/Badge";
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import CV, { ICV, IMenuItems } from "../shared/components/CV";
import Fab from "@mui/material/Fab";
import { StoreContext } from "../shared/context/StoreProvider";
import { useDialog } from "../shared/context/DialogProvider";
import CVTemplate from "../CVTemplate/CVTemplate";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  useCustomMutationClient,
  useCustomQueryClient,
} from "../config/queryClient";
import PaymentCheckout from "../shared/components/PaymentCheckout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateCVState } from "../store/cv/cvSlice";
import Confirmation from "../shared/components/Confirmation";

const menuItems: IMenuItems[] = [
  {
    id: "1",
    action: "Edit",
    icon: "mingcute:edit-line",
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [cvId, setCVId] = useState<string | null>(null);

  const {
    isLoading: queryLoading,
    error: queryError,
    data: queryData,
    isSuccess: querySuccess,
    refetch,
  } = useCustomQueryClient<ICV[]>({
    url: "/cv/fetchAll",
    method: "get",
    queryKey: "getAllUserCV",
    enabled: true,
  });

  const {
    mutate,
    isPending: mutatePending,
    error: mutateError,
    data: mutateData,
    isSuccess: mutateSuccess,
  } = useCustomMutationClient<ICV>({
    url: `/cv/delete/${cvId}`,
    method: "delete",
    mutationKey: "deleteUserCV",
    successCallback: () => {
      refetch()
    },
  });

  const cv = useSelector((state: RootState) => state.cv);
  const dispatch = useDispatch();

  const { openDialog,setIsOpen } = useDialog();

  useEffect(() => {
    if (!queryLoading && querySuccess) {
      dispatch(updateCVState(queryData.data.data));
    }
  }, [queryLoading, querySuccess, queryData]);

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
   
    setCVId(cv._id);
    await mutate(cv);
    dispatch(updateCVState(queryData?.data.data));
    setIsOpen(false)
  };

  const parentMenuItemClick = (
    { id, action }: Partial<IMenuItems>,
    cv: ICV
  ) => {
    switch (action) {
      case "Edit":
        navigate(`/app/editor/${cv._id}`, {
          state: {
            fetchUrl: `/cv/fetch/${cv._id}`,
            postUrl: `/cv/update/${cv._id}`,
            query: true,
          },
        });
        break;
      case "Preview":
        openDialog(
          <CVTemplate cv={cv} width="650px" showDownload={true} />,
          "CV Preview"
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

  return (
    <>
      <Chip
        label={`Total CV's - ${cv.length}`}
        color="success"
        sx={{
          margin: "1rem",
          width: "15%",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      />
      <CV
        cv={cv}
        parentMenuItemClick={parentMenuItemClick}
        menuItems={menuItems}
      />
      <div className="flex justify-end p-4 mt-auto">
        <Link to={"/app/layout"}>
          <Tooltip title="Create New CV" arrow>
            <Fab color="primary" aria-label="create-cv">
              <Icon
                icon="majesticons:plus-line"
                style={{ color: "fff" }}
                width={"1rem"}
              />
            </Fab>
          </Tooltip>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
