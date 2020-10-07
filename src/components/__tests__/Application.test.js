import React from "react";
import { 
  render, 
  cleanup,
  getByText,
  waitForElement,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
  waitForElementToBeRemoved,
  //prettyDOM
} from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import Application from "components/Application";
import axios from 'axios';

afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });

describe("Application", () => {
  
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application.
    const { container } = render(<Application />);
    
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    
    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // MENTOR ASSISTANCE REQ'D
    // ========================
    // Click the first interviewer in the list.
    // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
    // console.log(prettyDOM(appointment));
    
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
})
it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application
  const { container, debug } = render(<Application />);
  
  // 2. Wait until the text "Archie Cohen" is displayed
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[1];
  
  // 3. Click the "Edit" button on the booked appointment
  fireEvent.click(getByAltText(appointment, "Edit"));
  
  // 4. Check that the edit form is displayed
  expect(getByDisplayValue(appointment, /archie cohen/i)).toBeInTheDocument();
  
  // 5. Enter the name "Alice Roberts" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Alice Roberts" },
  });

  // 6. Click the "Save" button on the booked appointment
  fireEvent.click(getByText(appointment, "Save"));

  // 7. Check that the element with the text "Saving" is displayed.
  await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

  // 8. wait for the saving operation to complete
  expect(getByText(appointment, "Alice Roberts")).toBeInTheDocument();

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

  expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();

  debug();

})
/* test number five */
it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // MENTOR ASSISTANCE REQ'D
  // ========================
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  await waitForElement(() => getByText(appointment, "Error"));
  expect(
    getByText(appointment, "Could not book appointment")
  ).toBeInTheDocument();

  debug();
});

it("shows the delete error when failing to delete an existing appointment", () => {
  axios.put.mockRejectedValueOnce();
})
