import { style } from "@vanilla-extract/css";
import { scrollbar, vars } from "../../App.css";

export const pageContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});
export const schedulePageContainer = style({
  margin: "30px 50px",
  flex: "1",
  overflowY: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const schedulePageTitle = style({
  fontFamily: vars.font.inter,
  fontSize: vars.fontSizing.H4,
  fontWeight: "bold",
});

export const dateSettingRow = style({
  display: "flex",
  alignItems: "end",
  marginTop: "10px",
  marginBottom: "5px",
  fontSize: vars.fontSizing.H9,
});

export const wave = style({
  height: "100%",
  alignSelf: "center",
});

export const datePickerContainer = style({
  width: "75px",
  textAlign: "right",
});

export const dateContainer = style({
  margin: "0 10px",
});

export const schedulersContainer = style({
  backgroundColor: vars.color.secondary,
  width: "auto",
  padding: "10px 30px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  borderRadius: vars.radius.small,
  flex: "1",
  overflowY: "auto",
  ...scrollbar,
});
