import Button from "@mui/material/Button";
import { LOGIN_REGISTR_PAGE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/logInRegistrReducer";
import TextBlock from "../components/TextBlock";
import {
  createTextBlock,
  deleteTextBlock,
} from "../redux/reducers/textBlocksReducer";
import CustomModal from "../components/CustomModal";
import { useState } from "react";
import CostomEditor from "../components/CustomEditor";
import { Box } from "@mui/system";

function Dashboard() {
  const textBlocks = useSelector((state) => state.textBlocksReducer.blocks);
  const [open, setOpen] = useState(false);
  const [newTextBlockValue, setNewTextBlockValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
    navigate(LOGIN_REGISTR_PAGE);
  };

  const deleteBlockHandler = (id) => {
    dispatch(deleteTextBlock(id));
  };

  const newTextBlockValueHandler = (e) => {
    setNewTextBlockValue(e);
  };

  const handleClose = () => {
    setNewTextBlockValue([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]);
    setOpen(false);
  };

  const createTextBlockHandler = () => {
    dispatch(createTextBlock(newTextBlockValue));
    handleClose();
  };

  return (
    <div
      style={{ paddingTop: "80px", background: "LightGray", height: "100vh" }}
    >
      {open ? (
        <CustomModal handleClose={handleClose} open={open}>
          <CostomEditor
            initialValue={newTextBlockValue}
            onChange={newTextBlockValueHandler}
          />
          <Box
            sx={{
              paddingTop: "32px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={createTextBlockHandler} variant="outlined">
              Create
            </Button>
          </Box>
        </CustomModal>
      ) : null}
      <Header>
        <Button
          onClick={logOutHandler}
          style={{ textDecoration: "none", color: "#FFB300" }}
        >
          log out
        </Button>
      </Header>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setOpen(true)}
          sx={{ width: "200px" }}
          variant="outlined"
        >
          +
        </Button>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "space-between",
        }}
      >
        {textBlocks.map((block) => {
          return (
            <TextBlock
              key={block.id}
              block={block}
              deleteTextBlock={deleteBlockHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
