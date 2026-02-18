# Requirements Document

## Introduction

This document specifies the requirements for a comprehensive 3-phase corrugated box manufacturing website that guides users from initial discovery through authentication to receiving detailed cost estimates. The system integrates product showcase, user authentication, multi-step calculation wizard, and results presentation to provide a complete quote generation experience.

## Glossary

- **Website**: The complete corrugated box manufacturing web application
- **User**: A visitor or authenticated customer seeking box cost estimates
- **Calculator**: The multi-step wizard interface for collecting box specifications
- **Quote**: A cost estimate generated based on user-provided specifications
- **CTA**: Call-to-Action button that guides user progression
- **Authentication_Gate**: Login/signup modal or page for user verification
- **Box_Specification**: Complete set of parameters needed for cost calculation
- **Results_Page**: Final display showing calculated costs and next action options

## Requirements

### Requirement 1

**User Story:** As a potential customer, I want to explore available box products and services on the homepage, so that I can understand the company's offerings before requesting a quote.

#### Acceptance Criteria

1. WHEN a user visits the homepage, THE Website SHALL display three main product sections for Custom Boxes, Printed Boxes, and Specialty/Designer Boxes
2. WHEN the homepage loads, THE Website SHALL highlight the Custom Design Service prominently
3. WHEN a user views any page, THE Website SHALL display a primary "Get an Instant Quote" CTA button that is highly visible
4. WHEN a user clicks on product sections, THE Website SHALL provide navigation to detailed product information
5. WHERE product detail pages exist, THE Website SHALL include secondary "Get an Instant Quote" CTA buttons

### Requirement 2

**User Story:** As a user ready to get a quote, I want to be authenticated before accessing the calculator, so that my quotes can be saved and managed.

#### Acceptance Criteria

1. WHEN a user clicks "Get an Instant Quote", THE Website SHALL check if the user is currently authenticated
2. IF the user is not authenticated, THEN THE Website SHALL present the Authentication_Gate modal or page
3. WHEN a user successfully authenticates, THE Website SHALL redirect them to the Calculator step 1
4. WHEN authentication fails, THE Website SHALL display appropriate error messages and allow retry
5. WHILE the Authentication_Gate is displayed, THE Website SHALL prevent access to the Calculator

### Requirement 3

**User Story:** As an authenticated user, I want to specify my box requirements through a guided multi-step process, so that I can provide accurate specifications for cost calculation.

#### Acceptance Criteria

1. WHEN the Calculator loads, THE Website SHALL display a progress indicator showing "Step X of 6"
2. WHEN a user is on any Calculator step, THE Website SHALL provide "Next" and "Previous" navigation buttons
3. WHEN a user selects "Box Dimensions" in step 1, THE Website SHALL show Length, Width, Height fields and Units/Box Type dropdowns in step 2
4. WHEN a user selects "Sheet Size" in step 1, THE Website SHALL show Sheet Length and Sheet Width fields in step 2
5. WHEN a user selects a Paper Quality in step 3, THE Website SHALL dynamically populate the Paper Weight dropdown with corresponding options

### Requirement 4

**User Story:** As a user entering production details, I want the interface to adapt based on my selections, so that I only see relevant options and maintain data accuracy.

#### Acceptance Criteria

1. WHEN a user selects "Pinning" for Box Attachments, THE Website SHALL display the "Pins per Box" input field
2. WHEN a user selects "None" or "Hand Pasting" for Box Attachments, THE Website SHALL hide the "Pins per Box" input field
3. WHEN a user enters a Ply Number, THE Website SHALL validate that the number is odd and display error messages for even numbers
4. WHEN a user completes step 4, THE Website SHALL enable progression to manufacturing options
5. WHEN a user enters invalid production details, THE Website SHALL prevent form submission and highlight errors

### Requirement 5

**User Story:** As a user configuring manufacturing options, I want to see relevant choices based on my flute type selection, so that I can make appropriate manufacturing decisions.

#### Acceptance Criteria

1. WHEN a user selects "EF" flute type, THE Website SHALL display EF-specific Punching/Scoring options
2. WHEN a user selects "NF" flute type, THE Website SHALL display NF-specific Punching/Scoring options
3. WHEN a user checks Lamination or Printing options, THE Website SHALL maintain these selections throughout the session
4. WHEN a user completes all manufacturing options, THE Website SHALL enable the "Calculate My Estimate" button
5. WHEN a user clicks "Calculate My Estimate", THE Website SHALL submit the complete Box_Specification to the backend API

### Requirement 6

**User Story:** As a user who has submitted specifications, I want to see clear cost estimates and understand my next steps, so that I can make informed decisions about my order.

#### Acceptance Criteria

1. WHEN the API returns cost calculations, THE Website SHALL display the cost per box prominently on the Results_Page
2. WHEN displaying results, THE Website SHALL show the total cost for the complete order
3. WHEN the Results_Page loads, THE Website SHALL provide a "Save Quote" button that stores the configuration to the user's account
4. WHEN the Results_Page loads, THE Website SHALL provide a "Contact Sales" button that opens communication options
5. WHEN the Results_Page loads, THE Website SHALL provide a "Start New Calculation" button that returns to Calculator step 1

### Requirement 7

**User Story:** As a user interacting with the calculator, I want my data to be validated and processed correctly, so that I receive accurate cost estimates.

#### Acceptance Criteria

1. WHEN a user submits the Calculator form, THE Website SHALL send a properly formatted API request to the backend
2. WHEN the backend processes the request, THE Website SHALL use the box_cost_calculator.py module for calculations
3. WHEN the API returns results, THE Website SHALL parse the JSON response and extract cost breakdown information
4. IF the API request fails, THEN THE Website SHALL display appropriate error messages and allow retry
5. WHEN calculations complete successfully, THE Website SHALL transition the user to the Results_Page

### Requirement 8

**User Story:** As a user navigating the website, I want a consistent and responsive interface, so that I can complete my tasks efficiently across different devices.

#### Acceptance Criteria

1. WHEN a user accesses any page, THE Website SHALL maintain consistent navigation and branding elements
2. WHEN a user interacts with form elements, THE Website SHALL provide immediate visual feedback for validation states
3. WHEN a user progresses through Calculator steps, THE Website SHALL preserve previously entered data when navigating backward
4. WHEN the Website loads on different screen sizes, THE Website SHALL adapt the layout appropriately for mobile and desktop
5. WHEN a user encounters loading states, THE Website SHALL display appropriate progress indicators