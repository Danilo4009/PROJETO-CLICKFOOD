import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

export const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Step = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  color: ${(props) => (props.active ? "#27ae60" : "#bdc3c7")};
  font-weight: ${(props) => (props.active ? "600" : "400")};

  &::after {
    content: "";
    position: absolute;
    top: 15px;
    right: -50%;
    width: 100%;
    height: 4px;
    background-color: ${(props) => (props.completed ? "#27ae60" : "#bdc3c7")};
    z-index: -1;
  }

  &:last-child::after {
    content: none;
  }
`;

export const StepCircle = styled.div`
  margin: 0 auto 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.completed ? "#27ae60" : "#ecf0f1")};
  border: 3px solid ${(props) => (props.completed ? "#27ae60" : "#bdc3c7")};
  color: white;
  line-height: 24px;
  font-weight: bold;
`;

export const StatusDetails = styled.div`
  background: #f5f5f5;
  padding: 1.5rem 2rem;
  border-radius: 10px;
`;

export const ItemList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
`;

export const Item = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const Total = styled.strong`
  display: block;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: right;
`;
