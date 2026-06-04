import React from "react";
import Link from "next/link";

export default function ViewAllProjectsButton() {
  return (
    <div className="back-button-container">
      <Link href="/?scrollTo=projects" className="btn">
        <i className='bx bx-left-arrow-alt'></i> View All Projects
      </Link>
    </div>
  );
}
