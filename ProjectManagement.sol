// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;


struct Project {
    string tittle;
    string description;
    address owner;
    string ownerId;
    string createdAt;
}

contract ProjectManagement {

    // local ganache my projects workspace contarct address: 0x076A214bbc5737BCA6E29EB8E53A044E6c433a47

    mapping(string => Project) private projects;

    function getProject(string calldata id) public view returns(Project memory) {
        return projects[id];
    }

    function copyrightProject(string calldata id, Project calldata project) public {
        projects[id] = project;
    }

}
