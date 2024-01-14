def count_satisfying_integers(t, test_cases):
    results = []
    
    for _ in range(t):
        n = test_cases[_][0]
        constraints = test_cases[_][1:]
        
        lower_bound = float('-inf')
        upper_bound = float('inf')
        
        for a, x in constraints:
            if a == 1:
                lower_bound = max(lower_bound, x)
            elif a == 2:
                upper_bound = min(upper_bound, x)
        
        # If lower_bound is greater than upper_bound, no integer satisfies the constraints
        if lower_bound > upper_bound:
            results.append(0)
        else:
            results.append(upper_bound - lower_bound + 1)
    
    return results

# Input reading
t = int(input())
test_cases = []
for _ in range(t):
    n = int(input())
    constraints = [tuple(map(int, input().split())) for _ in range(n)]
    test_cases.append((n, constraints))

# Output
results = count_satisfying_integers(t, test_cases)
for result in results:
    print(result)
