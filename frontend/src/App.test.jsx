import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import App from "./App";

test("renders TrendGuard heading", () => {
  render(<App />);
  expect(screen.getByText("TrendGuard Dashboard")).toBeTruthy();
});
