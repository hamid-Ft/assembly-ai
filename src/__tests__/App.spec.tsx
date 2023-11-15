import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import React from "react";

// Mock MediaStream
global.MediaStream = jest.fn();

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
