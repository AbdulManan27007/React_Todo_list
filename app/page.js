"use client";

import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { ImPlus } from "react-icons/im";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [maintask, setmaintask] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  //Delete Button Alert
  const AlertDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your Task has been deleted.", "success");
      }
    });
  };
  //Add button Alert
  const AlertSave = () => {
    Swal.fire({
      position: "mid",
      icon: "success",
      title: "Your Task has been added",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  //Edit button Alert
  const AlertEdit = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You are able to edit the Task",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update task
      const updatedTasks = [...maintask];
      updatedTasks[editIndex] = { title, desc };
      setmaintask(updatedTasks);
      setEditMode(false);
      setEditIndex(null);
    } else {
      setmaintask([...maintask, { title, desc }]);
    }
    settitle("");
    setdesc("");
  };
  const handleEdit = (index) => {
    const taskToEdit = maintask[index];
    settitle(taskToEdit.title);
    setdesc(taskToEdit.desc);
    setEditMode(true);
    setEditIndex(index);
  };
  //Delete Task
  const deleteHandler = (index) => {
    let copytask = [...maintask];
    copytask.splice(index, 1);
    setmaintask(copytask);
  };

  let rendertask = <h2 className="font-bold font-sans">No Task Available</h2>;
  if (maintask.length > 0) {
    rendertask = maintask.map((t, index) => {
      return (
        <li key={index} className="flex items-center justify-between">
          <div className="flex justify-between  items-center mb-5 w-2/3">
            <h5 className="text-3xl font-sans font-bold	">{t.title}</h5>
            <h5 className="text-xl font-sans ">{t.desc}</h5>
          </div>

          {/* <Link href="/Update"> */}
          <li className=" flex space-x-8">
            <button
              title="Edit"
              onClick={() => {
                handleEdit(index);
                AlertEdit();
              }}
            >
              <BiSolidEdit className=" h-7 w-7 text-blue-600" />
            </button>
            {/* </Link> */}

            <button
              title="Delete"
              onClick={() => {
                deleteHandler(index);
                AlertDelete();
              }}
            >
              <AiOutlineDelete className=" h-7 w-7 text-red-600" />
            </button>
          </li>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="text-white text-5xl font-bold bg-green-700  text-center p-5 font-sans">
        Todo List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-green-700 rounded border-4 px-4 py-2 m-8"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />

        <input
          type="text"
          className="text-2xl border-green-700 rounded border-4 px-4 py-2 m-8"
          placeholder="Enter Discription"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button
          title={editMode ? "Edit Task" : "Add Task"}
          className="bg-green-700 text-white px-4 mt-5 py-2 rounded font-bold border-4"
          type="submit"
          onClick={AlertSave}
        >
          {editMode ? <BiSolidEdit /> : <ImPlus />}
        </button>
      </form>
      <hr />
      <div className="p-8 bg-green-100">
        <ul>{rendertask}</ul>
      </div>
    </>
  );
};

export default page;
