# #!/bin/bash

# # Function to create API module
# create_api_module() {
#   local module_name=$1
  
#   # Create directory if it does not exist
#   mkdir -p "$module_name"
  
#   # Array of file types
#   declare -a types=("router" "controller" "service")
  
#   # Loop through types and create files
#   for type in "${types[@]}"
#   do
#     echo "// ${module_name} ${type}" > "${module_name}/${module_name}.${type}.ts"
#     echo "export class ${module_name^}${type^} {}" >> "${module_name}/${module_name}.${type}.ts"
#   done
# }

# # Check if argument is provided
# if [ $# -eq 0 ]
# then
#   echo "Usage: $0 <module_name>"
#   exit 1
# fi

# # Call function with module name
# create_api_module "$1"

#!/usr/bin/env bash

# Function to create API module
create_api_module() {
  local module_path=$1
  local module_name=$(basename "$module_path")
  local capitalized_module_name=$(echo "$module_name" | awk '{print toupper(substr($0,1,1))tolower(substr($0,2))}')

  # Create directory if it does not exist
  mkdir -p "$module_path"
  
  # Generate controller file
  cat <<EOF > "${module_path}/${module_name}.controller.ts"
import { ${capitalized_module_name}Service } from './${module_name}.service';

export class ${capitalized_module_name}Controller {
  private service: ${capitalized_module_name}Service;

  constructor() {
    this.service = new ${capitalized_module_name}Service();
  }

  public getHello(): string {
    return this.service.getHello();
  }
}
EOF

  # Generate service file
  cat <<EOF > "${module_path}/${module_name}.service.ts"
export class ${capitalized_module_name}Service {
  public getHello(): string {
    return 'Hello from ${capitalized_module_name}Service!';
  }
}
EOF

  # Generate router file
  cat <<EOF > "${module_path}/${module_name}.router.ts"
import { Router } from 'express';
import { ${capitalized_module_name}Controller } from './${module_name}.controller';

const ${module_name}Router: Router = Router();
const controller = new ${capitalized_module_name}Controller();

${module_name}Router.get('/', (req, res) => {
  res.send(controller.getHello());
});

export default ${module_name}Router;
EOF
}

# Check if argument is provided
if [ $# -eq 0 ]
then
  echo "Usage: $0 <module_path>"
  exit 1
fi

# Call function with module path
create_api_module "$1"
