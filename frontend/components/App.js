// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from "react";

let id = 0;
const getId = () => ++id;

let teamMembers = [
  {
    id: getId(),
    fname: "Alice",
    lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces.",
  },
  {
    id: getId(),
    fname: "Bob",
    lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world.",
  },
];

const initialFormValues = {
  fname: "",
  lname: "",
  bio: "",
};

export default function App() {
  const [members, setMembers] = useState(teamMembers);
  const [editing, setEditing] = useState(null);
  const [inputValues, setInputValues] = useState(initialFormValues);

  useEffect(() => {
    if (editing === null) {
      setInputValues(initialFormValues);
    } else {
      const { fname, lname, bio } = members.find((mem) => mem.id === editing);
      setInputValues({ fname, lname, bio });
    }
  }, [editing]);

  const handleChange = (evt) => {
    const { id, value } = evt.target;
    setInputValues((prevValues) => ({ ...prevValues, [id]: value }));
  };
  const edit = (id) => {
    setEditing(id);
  };

  const submitNewMember = () => {
    const { fname, lname, bio } = inputValues;
    const newMember = { fname, lname, bio, id: getId() };
    setMembers([...members, newMember]);
    setInputValues(initialFormValues);
  };
  const editExistingMember = () => {
    setMembers((prevMembers) =>
      prevMembers.map((mem) => {
        if (mem.id === editing) {
          return { ...mem, ...inputValues };
        } else {
          return mem;
        }
      })
    );
    setEditing(null);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (editing) {
      editExistingMember();
    } else {
      submitNewMember();
    }
    setInputValues(initialFormValues);
  };
  return (
    <div>
      {/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map((mem) => (
            <div key={mem.id} className="member">
              <div>
                <h4>
                  {mem.fname} {mem.lname}
                </h4>
                <p>{mem.bio}</p>
              </div>
              <button onClick={() => edit(mem.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? "Edit" : "Add"} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              id="fname"
              type="text"
              placeholder="Type First Name"
              onChange={handleChange}
              name="fname"
              value={inputValues.fname}
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input
              id="lname"
              type="text"
              placeholder="Type Last Name"
              onChange={handleChange}
              value={inputValues.lname}
              name="lname"
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea
              id="bio"
              placeholder="Type Bio"
              onChange={handleChange}
              name="bio"
              value={inputValues.bio}
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
