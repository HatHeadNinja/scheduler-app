import React from "react";
import { 
  render, 
  cleanup,
  getByText,
  waitForElement,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  //waitForElementToBeRemoved,
  queryByText,
  //prettyDOM
} from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";
import Application from "components/Application";

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
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click "Delete" button on a booked appointment
    // 4. Check confirmation message is shown
    // 5. Click "Confirm" button on the confirmation dialog
    // 6. Check element with the text "Deleting" is being displayed
    // 7. Wait until element with "Add" button is being displayed
    // 8. Check DayListItem with the text "Monday" also has text "2 spots remaining"
    
  })
})
/* Tests to write
"loads data, edits an interview and keeps the spots remaining for Monday the same"
"shows the save error when failing to save an appointment"
"shows the delete error when failing to delete an existing appointment" */