import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'
 
describe('Navbar', () => {
  it('renders KnowledgePool heading', () => {
    render(<Navbar />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("KnowledgePool")
  })

  it('renders navigation links', () => {
    render(<Navbar />)

    const linkToPosts = screen.getByRole('link', { name: "The Pool" })
    expect(linkToPosts.getAttribute("href")).toBe("/post")
    
    const linkToReviewForm = screen.getByRole('link', { name: "Filtration System" })
    expect(linkToReviewForm.getAttribute("href")).toBe("/review")
    
    const linkToUserSubmissions = screen.getByRole('link', { name: "My Drops" })
    expect(linkToUserSubmissions.getAttribute("href")).toBe("/post/reviews")
    
    const linkToPostCreation = screen.getByRole('link', { name: "Create A Drop" })
    expect(linkToPostCreation.getAttribute("href")).toBe("/post/submit")
  })
})