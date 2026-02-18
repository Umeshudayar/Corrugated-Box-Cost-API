# Implementation Plan

- [ ] 1. Set up enhanced project structure and core interfaces
  - Create TypeScript interfaces for all data models (BoxCalculationRequest, UserSession, CalculatorState)
  - Set up React Context for calculator state management
  - Configure API client with proper error handling
  - Install and configure testing frameworks (Jest, React Testing Library, fast-check)
  - _Requirements: 8.1, 7.1_

- [ ] 1.1 Write property test for API request formatting
  - **Property 12: API request formatting**
  - **Validates: Requirements 5.5, 7.1**

- [ ] 2. Implement Phase 1: Homepage and product showcase
  - Create enhanced homepage component with three product sections (Custom, Printed, Specialty boxes)
  - Implement prominent Custom Design Service highlighting
  - Add primary "Get an Instant Quote" CTA with consistent styling
  - Create product section components with navigation to detail pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 2.1 Write property test for CTA button visibility
  - **Property 1: CTA button visibility**
  - **Validates: Requirements 1.3**

- [ ] 2.2 Write unit tests for homepage components
  - Test product section rendering
  - Test CTA button presence and styling
  - Test Custom Design Service prominence
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Implement Phase 2: Authentication gate and user management
  - Enhance existing auth page with proper validation and error handling
  - Create authentication context and session management
  - Implement authentication check logic for CTA clicks
  - Add redirect logic post-authentication
  - Create protected route wrapper for calculator access
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 3.1 Write property test for authentication gate enforcement
  - **Property 2: Authentication gate enforcement**
  - **Validates: Requirements 2.1, 2.5**

- [ ] 3.2 Write unit tests for authentication components
  - Test login/signup form validation
  - Test error message display
  - Test redirect logic
  - _Requirements: 2.2, 2.3, 2.4_

- [ ] 4. Create calculator wizard foundation and step navigation
  - Build calculator wizard container with progress indicator
  - Implement step navigation with Next/Previous buttons
  - Create calculator state management with React Context
  - Add form validation framework
  - Implement step transition logic with validation
  - _Requirements: 3.1, 3.2, 4.4, 5.4_

- [ ] 4.1 Write property test for calculator progress indication
  - **Property 3: Calculator progress indication**
  - **Validates: Requirements 3.1**

- [ ] 4.2 Write property test for calculator navigation consistency
  - **Property 4: Calculator navigation consistency**
  - **Validates: Requirements 3.2**

- [ ] 4.3 Write property test for form progression enablement
  - **Property 8: Form progression enablement**
  - **Validates: Requirements 4.4, 5.4**

- [ ] 5. Implement calculator Step 1: Input type selection
  - Create input type selection component with radio buttons
  - Implement state management for input type choice
  - Add visual feedback for selection
  - _Requirements: 3.3, 3.4_

- [ ] 6. Implement calculator Step 2: Dimensions input with conditional rendering
  - Create conditional form fields based on input type selection
  - Implement box dimensions form (Length, Width, Height, Units, Box Type)
  - Implement sheet size form (Sheet Length, Sheet Width)
  - Add form validation for dimension inputs
  - _Requirements: 3.3, 3.4_

- [ ] 6.1 Write property test for input type field visibility
  - **Property 6: Input type determines field visibility**
  - **Validates: Requirements 3.3, 3.4**

- [ ] 7. Implement calculator Step 3: Box properties with dynamic dropdowns
  - Create paper properties form with three sections (Bottom, Flute, Top)
  - Implement dynamic paper weight dropdown population based on quality selection
  - Add paper quality and weight selection components
  - Create paper quality to weight mapping logic
  - _Requirements: 3.5_

- [ ] 7.1 Write property test for dynamic paper weight population
  - **Property 5: Dynamic paper weight population**
  - **Validates: Requirements 3.5**

- [ ] 8. Implement calculator Step 4: Production details with conditional fields
  - Create production details form (Ply Number, Boxes per Sheet, Number of Boxes)
  - Implement box attachments selection with conditional "Pins per Box" field
  - Add ply number validation (must be odd)
  - Create form validation with error highlighting
  - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [ ] 8.1 Write property test for ply number validation
  - **Property 7: Ply number validation**
  - **Validates: Requirements 4.3**

- [ ] 8.2 Write property test for form validation blocking
  - **Property 9: Form validation blocking**
  - **Validates: Requirements 4.5**

- [ ] 8.3 Write unit tests for production details components
  - Test conditional pins per box field visibility
  - Test ply number validation error messages
  - Test form submission blocking with invalid data
  - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [ ] 9. Implement calculator Step 5: Manufacturing options with flute-specific choices
  - Create manufacturing options form with flute type selection
  - Implement conditional punching/scoring options based on flute type
  - Add lamination and printing checkboxes
  - Create flute type to options mapping logic
  - Add "Calculate My Estimate" button with form completion validation
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 9.1 Write property test for flute type options
  - **Property 10: Flute type determines options**
  - **Validates: Requirements 5.1, 5.2**

- [ ] 9.2 Write property test for session state persistence
  - **Property 11: Session state persistence**
  - **Validates: Requirements 5.3, 8.3**

- [ ] 10. Checkpoint - Ensure calculator wizard tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement API integration and data submission
  - Create API client functions for calculation requests
  - Implement form data transformation to BoxCalculationRequest format
  - Add API error handling with user-friendly messages
  - Create loading states and progress indicators
  - _Requirements: 7.1, 7.4, 8.5_

- [ ] 11.1 Write property test for API response parsing
  - **Property 14: API response parsing**
  - **Validates: Requirements 7.3**

- [ ] 11.2 Write property test for loading state indication
  - **Property 17: Loading state indication**
  - **Validates: Requirements 8.5**

- [ ] 12. Implement Phase 3: Results page and next actions
  - Create results page component with cost display
  - Implement cost per box and total order cost display
  - Add action buttons (Save Quote, Contact Sales, Start New Calculation)
  - Create cost breakdown visualization
  - Implement navigation back to calculator step 1
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.5_

- [ ] 12.1 Write property test for results display consistency
  - **Property 13: Results display consistency**
  - **Validates: Requirements 6.1, 6.2**

- [ ] 12.2 Write unit tests for results page components
  - Test cost display formatting
  - Test action button presence and functionality
  - Test navigation to new calculation
  - _Requirements: 6.3, 6.4, 6.5_

- [ ] 13. Implement consistent navigation and UI feedback
  - Enhance navbar and footer components for consistency across all pages
  - Implement form feedback system with immediate validation
  - Add responsive design improvements for mobile/desktop
  - Create consistent branding and styling
  - _Requirements: 8.1, 8.2_

- [ ] 13.1 Write property test for navigation consistency
  - **Property 15: Navigation consistency**
  - **Validates: Requirements 8.1**

- [ ] 13.2 Write property test for form feedback responsiveness
  - **Property 16: Form feedback responsiveness**
  - **Validates: Requirements 8.2**

- [ ] 14. Implement data persistence and state management
  - Add localStorage backup for calculator state
  - Implement state recovery mechanisms
  - Create session management for user data
  - Add data validation and sanitization
  - _Requirements: 8.3_

- [ ] 15. Final integration and end-to-end testing
  - Create end-to-end test scenarios for complete user journeys
  - Test Phase 1 → Phase 2 → Phase 3 flow
  - Validate API integration with backend
  - Test error scenarios and recovery paths
  - _Requirements: All phases integration_

- [ ] 15.1 Write integration tests for complete user journey
  - Test discovery to quote generation flow
  - Test authentication and calculator integration
  - Test API communication and results display
  - _Requirements: Complete system integration_

- [ ] 16. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.