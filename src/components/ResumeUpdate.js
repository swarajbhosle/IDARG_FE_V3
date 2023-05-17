import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const ResumeUpdateForm = ({ resume, onUpdate }) => {
  const [name, setName] = useState(resume.name);
  const [address, setAddress] = useState(resume.address);
  const [workExperience, setWorkExperience] = useState(resume.workExperience);
  const [phoneNumber, setPhoneNumber] = useState(resume.phoneNumber);
  const [skills, setSkills] = useState(resume.skills);
  const [achievements, setAchievements] = useState(resume.achievements);
  const [education, setEducation] = useState(resume.education);
  const [projects, setProjects] = useState(resume.projects);
  const [cgpa, setCgpa] = useState(resume.cgpa);
  const [socialProfiles, setSocialProfiles] = useState(resume.socialProfiles);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedResume = {
      name,
      address,
      workExperience,
      phoneNumber,
      skills,
      achievements,
      education,
      projects,
      cgpa,
      socialProfiles
    };
    console.log('here',updatedResume);
    onUpdate(updatedResume);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, ""]);
  };

  const handleWorkExperienceChange = (index, value) => {
    setWorkExperience((prevWorkExperiences) => {
      const updatedWorkExperiences = [...prevWorkExperiences];
      updatedWorkExperiences[index] = value;
      return updatedWorkExperiences;
    });
  };

  const handleRemoveWorkExperience = (index) => {
    setWorkExperience((prevWorkExperiences) => prevWorkExperiences.filter((_, i) => i !== index));
  };

  const handleAddSocialProfile = () => {
    setSocialProfiles([...socialProfiles, ""]);
  };

  const handleSocialProfileChange = (index, value) => {
    setSocialProfiles((prevSocialProfiles) => {
      const updatedSocialProfiles = [...prevSocialProfiles];
      updatedSocialProfiles[index] = value;
      return updatedSocialProfiles;
    });
  };

  const handleRemoveSocialProfile = (index) => {
    setSocialProfiles((prevSocialProfiles) => prevSocialProfiles.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index, value) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = value;
      return updatedSkills;
    });
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
  };

  const handleAddAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  const handleAchievementChange = (index, value) => {
    setAchievements((prevAchievements) => {
      const updatedAchievements = [...prevAchievements];
      updatedAchievements[index] = value;
      return updatedAchievements;
    });
  };

  const handleRemoveAchievement = (index) => {
    setAchievements((prevAchievements) =>
      prevAchievements.filter((_, i) => i !== index)
    );
  };

  const handleAddEducation = () => {
    setEducation([...education, ""]);
  };

  const handleEducationChange = (index, value) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = value;
      return updatedEducation;
    });
  };

  const handleRemoveEducation = (index) => {
    setEducation((prevEducation) =>
      prevEducation.filter((_, i) => i !== index)
    );
  };

  const handleAddProject = () => {
    setProjects([...projects, ""]);
  };

  const handleProjectChange = (index, value) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = value;
      return updatedProjects;
    });
  };

  const handleRemoveProject = (index) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          type="text"
          name="address"
          id="address"
          placeholder="Enter your address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="phoneNumber">Phone Number</Label>
        <Input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="socialProfiles">Social Profiles</Label>
        {socialProfiles.map((socialProfile, index) => (
          <div
            key={`socialProfile-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="socialProfiles"
              id={`socialProfile-${index}`}
              placeholder="Enter a social profile detail"
              value={socialProfile}
              onChange={(event) => handleSocialProfileChange(index, event.target.value)}
              required
            />
            <Button
              color="white"
              className="ml-2"
              onClick={() => handleRemoveSocialProfile(index)}
              style={{marginLeft: "10px"}}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddSocialProfile}  style={{
          width: "180px",
        }}>
          Add Social Profile
        </Button>
      </FormGroup>

      <FormGroup>
        <Label for="workExperience">Work Experiences</Label>
        {workExperience.map((workExp, index) => (
          <div
            key={`workExp-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="workExperience"
              id={`workExp-${index}`}
              placeholder="Enter a social profile detail"
              value={workExp}
              onChange={(event) => handleWorkExperienceChange(index, event.target.value)}
              required
            />
            <Button
              color="white"
              className="ml-2"
              onClick={() => handleRemoveWorkExperience(index)}
              style={{marginLeft: "10px"}}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddWorkExperience}  style={{
          width: "180px",
        }}>
          Add Work Experience
        </Button>
      </FormGroup>

      {/* <FormGroup>
        <Label for="workExperience">Work Experience</Label>
        <Input
          type="textarea"
          name="workExperience"
          id="workExperience"
          placeholder="Enter your work experience"
          value={workExperience}
          onChange={(event) => setWorkExperience(event.target.value)}
          required
        />
      </FormGroup>
       */}
      <FormGroup>
        <Label for="skills">Skills</Label>
        {skills.map((skill, index) => (
          <div
            key={`skill-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="skills"
              id={`skill-${index}`}
              placeholder="Enter a skill"
              value={skill}
              onChange={(event) => handleSkillChange(index, event.target.value)}
              required
            />
            <Button
              color="white"
              className="ml-2"
              onClick={() => handleRemoveSkill(index)}
              style={{marginLeft: "10px"}}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddSkill}  style={{
          width: "180px",
        }}>
          Add Skill
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="achievements">Achievements</Label>
        {achievements.map((achievement, index) => (
          <div
            key={`achievement-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="achievements"
              id={`achievement-${index}`}
              placeholder="Enter an achievement"
              value={achievement}
              onChange={(event) =>
                handleAchievementChange(index, event.target.value)
              }
              required
            />
            <Button
              color="white"
              className="ml-2"
              onClick={() => handleRemoveAchievement(index)}
              style={{marginLeft: "10px"}}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddAchievement} style={{
          width: "180px",
        }}>
          Add Achievement
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="education">Education</Label>
        {education.map((educationItem, index) => (
          <div
            key={`education-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="education"
              id={`education-${index}`}
              placeholder="Enter an education"
              value={educationItem}
              onChange={(event) =>
                handleEducationChange(index, event.target.value)
              }
              required
            />
            <Button
              color="white"
              className="ml-2"
              onClick={() => handleRemoveEducation(index)}
              style={{marginLeft: "10px"}}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddEducation} style={{
          width: "180px",
        }}>
          Add Education
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="projects">Projects</Label>
        {projects.map((project, index) => (
          <div
            key={`project-${index}`}
            className="d-flex align-items-center mb-2"
          >
            <Input
              type="text"
              name="projects"
              id={`project-${index}`}
              placeholder="Enter a project"
              value={project}
              onChange={(event) =>
                handleProjectChange(index, event.target.value)
              }
              required
            />
            <Button
              color="white"
              className="ml-2"
              onClick={() => handleRemoveProject(index)}
              style={{marginLeft: "10px"}}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button color="primary" onClick={handleAddProject} style={{
          width: "180px",
        }}>
          Add Project
        </Button>
      </FormGroup>
      <FormGroup>
        <Label for="cgpa">CGPA</Label>
        <Input
          type="number"
          name="cgpa"
          id="cgpa"
          placeholder="Enter your CGPA"
          value={cgpa}
          onChange={(event) => setCgpa(event.target.value)}
          required
        />
      </FormGroup>
      <div className="text-center">
      <Button color="primary" type="submit">
        Update Resume
      </Button>
      </div>
      
    </Form>
  );
};
