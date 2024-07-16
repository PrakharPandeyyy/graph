export const ques = [
    {
        question:"Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order. The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).Sample:Input: graph = [[1,2],[3],[3],[]]Output: [[0,1,3],[0,2,3]]Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.",
    },
    
    {
        question:"There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w. Now given all the cities and flights, together with the starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. Devise an algorithm to solve the problem. Explain your approach to the solution.You can consider an example with n=5.",

    },
    {
        question:"There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.This year, there will be a big event in the capital (city 0), and many people want to travel to this city.Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.It's guaranteed that each city can reach city 0 after reorder."
    }
]
