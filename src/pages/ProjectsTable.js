import React, { useEffect, useState } from "react";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Fetch data from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Filter highly-rated projects
        const filteredProjects = data.filter(
          (project) =>
            project["percentage.funded"] >= 100 &&
            project["amt.pledged"] >= 50000 &&
            project["num.backers"] >= 1000
        );
        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjects();
  }, []);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(projects.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Highly-Rated Kickstarter Projects</h1>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((project, index) => (
            <tr key={project["s.no"]}>
              <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
              <td>{project["percentage.funded"]}%</td>
              <td>${project["amt.pledged"].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => (
            <React.Fragment key={page}>
              {index > 0 && array[index - 1] !== page - 1 && <span>...</span>}
              <button
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <p>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default ProjectsTable;
