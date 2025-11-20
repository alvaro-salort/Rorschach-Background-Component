import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Text, Input } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import Rorschach from '../../content/Backgrounds/Rorschach/Rorschach';
import { rorschach } from '../../constants/code/Backgrounds/rorschachCode';

const RorschachDemo = () => {
  const [patternColor, setPatternColor] = useState('#111111');
  const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
  const [speed, setSpeed] = useState(1.0);
  const [zoom, setZoom] = useState(2.5);
  const [density, setDensity] = useState(0.5);
  const [sharpness, setSharpness] = useState(0.9);

  const propData = [
    {
      name: 'patternColor',
      type: 'string',
      default: '"#111111"',
      description: 'Color of the ink pattern in Hex format.'
    },
    {
      name: 'backgroundColor',
      type: 'string',
      default: '"#eeeeee"',
      description: 'Background color in Hex format.'
    },
    {
      name: 'speed',
      type: 'number',
      default: '1.0',
      description: 'Animation speed factor.'
    },
    {
      name: 'zoom',
      type: 'number',
      default: '2.5',
      description: 'Scale of the noise pattern.'
    },
    {
      name: 'density',
      type: 'number',
      default: '0.5',
      description: 'Controls the thickness/spread of the ink.'
    },
    {
      name: 'sharpness',
      type: 'number',
      default: '0.9',
      description: 'Edge hardness (0=blurry, 1=crisp).'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
          <Rorschach
            patternColor={patternColor}
            backgroundColor={backgroundColor}
            speed={speed}
            zoom={zoom}
            density={density}
            sharpness={sharpness}
          />
        </Box>

        <Customize>
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Ink Color</Text>
            <Input
              type="color"
              value={patternColor}
              onChange={e => setPatternColor(e.target.value)}
              width="50px"
            />
            <Text fontSize="sm" ml={4}>Bg Color</Text>
            <Input
              type="color"
              value={backgroundColor}
              onChange={e => setBackgroundColor(e.target.value)}
              width="50px"
            />
          </Flex>

          <PreviewSlider
            min={0}
            max={5}
            step={0.1}
            title="Speed"
            value={speed}
            onChange={val => setSpeed(val)}
          />

          <PreviewSlider
            min={0.5}
            max={5}
            step={0.1}
            title="Zoom"
            value={zoom}
            onChange={val => setZoom(val)}
          />

          <PreviewSlider
            min={0}
            max={1}
            step={0.05}
            title="Density"
            value={density}
            onChange={val => setDensity(val)}
          />

          <PreviewSlider
            min={0}
            max={1}
            step={0.05}
            title="Sharpness"
            value={sharpness}
            onChange={val => setSharpness(val)}
          />
        </Customize>

        <PropTable data={propData} />
        {}
        <Dependencies dependencyList={[]} /> 
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={rorschach} />
      </CodeTab>
    </TabsLayout>
  );
};

export default RorschachDemo;
