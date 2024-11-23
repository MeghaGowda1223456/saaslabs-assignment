import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectsTable from "./pages/ProjectsTable";

global.fetch = jest.fn();

const mockProjects = [
  {
    "s.no": 1,
    "percentage.funded": 150,
    "amt.pledged": 100000,
    "num.backers": 2000,
  },
  // Add more mock projects here
];

beforeEach(() => {
  jest.useFakeTimers();
  fetch.mockResolvedValue({
    ok: true,
    json: async () => mockProjects,
  });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
});

test("renders correctly and fetches projects", async () => {
  render(<ProjectsTable />);

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
});
